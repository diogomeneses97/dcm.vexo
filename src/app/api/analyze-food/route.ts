import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    console.log('Calling OpenAI Vision API...');

    // Call OpenAI Vision API to analyze the food image
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this food image and provide nutritional information in JSON format. 
                
                Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
                {
                  "food": "name of the food item",
                  "calories": number,
                  "protein": number (in grams),
                  "carbs": number (in grams),
                  "fats": number (in grams),
                  "confidence": number (0-100, how confident you are in the identification)
                }
                
                Be as accurate as possible. If you see a burger, identify it as a burger, not salmon. If you're not sure, set confidence lower.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      return NextResponse.json(
        { 
          error: `OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}` 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response from OpenAI API' },
        { status: 500 }
      );
    }
    
    const content = data.choices[0].message.content;
    console.log('Raw content from OpenAI:', content);
    
    // Remove markdown code blocks if present
    const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Parse the JSON response
    let nutritionData;
    try {
      nutritionData = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse JSON:', cleanContent);
      return NextResponse.json(
        { error: 'Failed to parse nutrition data from AI response' },
        { status: 500 }
      );
    }

    // Validate the response structure
    if (!nutritionData.food || typeof nutritionData.calories !== 'number') {
      console.error('Invalid nutrition data structure:', nutritionData);
      return NextResponse.json(
        { error: 'Invalid nutrition data structure from AI' },
        { status: 500 }
      );
    }

    console.log('Successfully analyzed food:', nutritionData.food);
    return NextResponse.json(nutritionData);
  } catch (error) {
    console.error('Error analyzing food:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze food image';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
