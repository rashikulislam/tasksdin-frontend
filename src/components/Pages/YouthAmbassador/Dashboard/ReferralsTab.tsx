'use client';

import { 
  Copy, 
  Share2, 
  Award, 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PartnerData } from '@/components/Pages/YouthAmbassador/Dashboard/Data/types';

interface ReferralsTabProps {
  partnerData: PartnerData;
}

export default function ReferralsTab({ partnerData }: ReferralsTabProps) {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} কপি করা হয়েছে!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">রেফারেল সিস্টেম</h2>
        <p className="text-muted-foreground">প্রোভাইডার ও বাড়িওয়ালাদের রেফার করুন এবং আয় করুন</p>
      </div>

      {/* Referral Code & Link */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto text-primary mb-2" />
            <h3 className="text-lg font-bold">আপনার রেফারেল কোড</h3>
            <p className="text-muted-foreground text-sm mb-4">
              এই কোড শেয়ার করুন এবং প্রতিটি সম্পন্ন সার্ভিস থেকে ৫০% আয় করুন
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
            <code className="flex-1 text-center text-2xl font-bold text-primary">{partnerData.referralCode}</code>
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(partnerData.referralCode, 'রেফারেল কোড')}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
            <code className="flex-1 text-sm text-muted-foreground truncate">{partnerData.referralLink}</code>
            <Button variant="outline" size="icon" onClick={() => copyToClipboard(partnerData.referralLink, 'রেফারেল লিংক')}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => {
              if (navigator.share) {
                navigator.share({ url: partnerData.referralLink, title: 'Join TaskWala' });
              } else {
                copyToClipboard(partnerData.referralLink, 'রেফারেল লিংক');
              }
            }}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>কিভাবে কাজ করে?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step === 3 ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                  <span className={step === 3 ? 'font-bold text-green-500' : 'font-bold text-primary'}>{step}</span>
                </div>
                <div>
                  {step === 1 && (
                    <>
                      <h4 className="font-medium">রেফারেল লিংক শেয়ার করুন</h4>
                      <p className="text-sm text-muted-foreground">প্রোভাইডার বা বাড়িওয়ালাদের আপনার রেফারেল লিংক দিন</p>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h4 className="font-medium">তারা রেজিস্ট্রেশন করবে</h4>
                      <p className="text-sm text-muted-foreground">আপনার লিংক দিয়ে তারা একাউন্ট তৈরি করলে আপনার রেফারেল হবে</p>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h4 className="font-medium">৫০% আয় পান</h4>
                      <p className="text-sm text-muted-foreground">তাদের প্রতিটি সম্পন্ন সার্ভিসের চার্জ থেকে আপনি ৫০% পাবেন</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{partnerData.totalReferrals}</p>
            <p className="text-sm text-muted-foreground">মোট রেফারেল</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold">{partnerData.activeReferrals}</p>
            <p className="text-sm text-muted-foreground">সক্রিয় রেফারেল</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-2xl font-bold">{partnerData.pendingReferrals}</p>
            <p className="text-sm text-muted-foreground">অপেক্ষমান</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">৳{partnerData.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">মোট আয়</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
