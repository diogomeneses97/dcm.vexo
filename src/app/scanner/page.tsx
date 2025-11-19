'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Loader2, CheckCircle2, X, AlertCircle, Lock } from 'lucide-react';

interface ScanResult {
  id: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
  timestamp: Date;
}

const mockScanHistory: ScanResult[] = [
  {
    id: '1',
    food: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    confidence: 95,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    food: 'Brown Rice Bowl',
    calories: 215,
    protein: 5,
    carbs: 45,
    fats: 1.6,
    confidence: 88,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    food: 'Greek Yogurt',
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0.4,
    confidence: 92,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export default function ScannerPage() {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>(mockScanHistory);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scansRemaining, setScansRemaining] = useState(1);
  const [lastScanDate, setLastScanDate] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check weekly scan limit on mount
  useEffect(() => {
    const checkWeeklyScan = () => {
      const lastScan = localStorage.getItem('lastFreeScan');
      const scansUsed = parseInt(localStorage.getItem('scansUsedThisWeek') || '0');
      
      if (lastScan) {
        const lastScanDate = new Date(lastScan);
        const now = new Date();
        const daysSinceLastScan = Math.floor((now.getTime() - lastScanDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Reset if 7 days have passed
        if (daysSinceLastScan >= 7) {
          localStorage.setItem('scansUsedThisWeek', '0');
          setScansRemaining(1);
          setLastScanDate(null);
        } else {
          setScansRemaining(Math.max(0, 1 - scansUsed));
          setLastScanDate(lastScan);
        }
      }
    };

    checkWeeklyScan();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (scansRemaining <= 0) {
      setError('You have used your free scan for this week. Upgrade to Premium for unlimited scans!');
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImagePreview(imageData);
        analyzeFoodImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFoodImage = async (imageData: string) => {
    setScanning(true);
    setScanResult(null);
    setError(null);

    try {
      console.log('Sending image to API for analysis...');
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API error:', data);
        throw new Error(data.error || 'Failed to analyze image');
      }

      console.log('Analysis successful:', data);
      
      const result: ScanResult = {
        id: Date.now().toString(),
        food: data.food,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats,
        confidence: data.confidence,
        timestamp: new Date(),
      };
      
      setScanResult(result);

      // Update scan count
      const now = new Date().toISOString();
      localStorage.setItem('lastFreeScan', now);
      const newScansUsed = parseInt(localStorage.getItem('scansUsedThisWeek') || '0') + 1;
      localStorage.setItem('scansUsedThisWeek', newScansUsed.toString());
      setScansRemaining(Math.max(0, 1 - newScansUsed));
      setLastScanDate(now);
    } catch (error) {
      console.error('Error analyzing food:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze image';
      setError(errorMessage);
    } finally {
      setScanning(false);
    }
  };

  const handleSaveToLog = () => {
    if (scanResult) {
      setScanHistory([scanResult, ...scanHistory]);
      setScanResult(null);
      setImagePreview(null);
      setError(null);
    }
  };

  const handleReset = () => {
    setScanResult(null);
    setImagePreview(null);
    setScanning(false);
    setError(null);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getDaysUntilReset = () => {
    if (!lastScanDate) return 7;
    const lastScan = new Date(lastScanDate);
    const now = new Date();
    const daysSince = Math.floor((now.getTime() - lastScan.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 7 - daysSince);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t('scanner.title')}
          </h1>
          <p className="text-gray-400">{t('scanner.subtitle')}</p>
        </div>

        {/* Free Scan Status */}
        <Card className={`p-4 mb-6 ${scansRemaining > 0 ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20' : 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">
                {scansRemaining > 0 ? (
                  <>✨ Free Scan Available This Week</>
                ) : (
                  <>🔒 Free Scan Used - Resets in {getDaysUntilReset()} days</>
                )}
              </p>
              <p className="text-xs text-gray-400">
                {scansRemaining > 0 
                  ? 'Use your weekly free scan to try our AI food analysis'
                  : 'Upgrade to Premium for unlimited scans anytime'}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className={scansRemaining > 0 ? 'border-green-500/30' : 'border-orange-500/30'}
            >
              Upgrade
            </Button>
          </div>
        </Card>

        {/* Scanner Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
            disabled={scansRemaining <= 0}
          />

          {!imagePreview && !scanning && !scanResult && (
            <div className="text-center py-12">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${scansRemaining > 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-500/20'}`}>
                {scansRemaining > 0 ? (
                  <Camera className="w-12 h-12 text-white" />
                ) : (
                  <Lock className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">
                {scansRemaining > 0 ? 'Scan Your Food' : 'Free Scan Used'}
              </h2>
              <p className="text-gray-400 mb-6">
                {scansRemaining > 0 
                  ? 'Take a photo to instantly analyze calories and macros'
                  : `Your free scan resets in ${getDaysUntilReset()} days. Upgrade for unlimited access!`}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  size="lg"
                  disabled={scansRemaining <= 0}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {scansRemaining > 0 ? t('scanner.takePhoto') : 'Locked'}
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="lg"
                  className="border-purple-500/30"
                  disabled={scansRemaining <= 0}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          )}

          {imagePreview && (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Food scan"
                  className="w-full h-64 object-cover"
                />
                {!scanning && !scanResult && (
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {scanning && (
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-purple-500" />
                  <p className="text-lg font-semibold">{t('scanner.analyzing')}</p>
                  <p className="text-sm text-gray-400">Using AI to detect food and calculate nutrition...</p>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-500 mb-1">Analysis Failed</h3>
                      <p className="text-sm text-gray-300">{error}</p>
                      {error.includes('API key') && (
                        <p className="text-xs text-gray-400 mt-2">
                          Please configure your OpenAI API key in the environment variables.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    {!error.includes('free scan') && (
                      <Button
                        onClick={() => analyzeFoodImage(imagePreview)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30"
                      >
                        Try Again
                      </Button>
                    )}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="border-gray-500/30"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {scanResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <h3 className="text-xl font-bold">{t('scanner.detected')}</h3>
                      </div>
                      <p className="text-2xl font-bold text-purple-400">{scanResult.food}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {scanResult.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-orange-500/10">
                      <div className="text-2xl font-bold text-orange-500">
                        {scanResult.calories}
                      </div>
                      <div className="text-xs text-gray-400">Calories</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-cyan-500/10">
                      <div className="text-2xl font-bold text-cyan-500">
                        {scanResult.protein}g
                      </div>
                      <div className="text-xs text-gray-400">Protein</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-500/10">
                      <div className="text-2xl font-bold text-green-500">
                        {scanResult.carbs}g
                      </div>
                      <div className="text-xs text-gray-400">Carbs</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                      <div className="text-2xl font-bold text-yellow-500">
                        {scanResult.fats}g
                      </div>
                      <div className="text-xs text-gray-400">Fats</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveToLog}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t('scanner.save')}
                    </Button>
                    <Button onClick={handleReset} variant="outline" className="border-purple-500/30">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Scan History */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">{t('scanner.history')}</h2>
          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{scan.food}</h3>
                    <p className="text-xs text-gray-400">{formatTimeAgo(scan.timestamp)}</p>
                  </div>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    {scan.calories} cal
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{scan.protein}g protein</span>
                  <span>•</span>
                  <span>{scan.carbs}g carbs</span>
                  <span>•</span>
                  <span>{scan.fats}g fats</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
