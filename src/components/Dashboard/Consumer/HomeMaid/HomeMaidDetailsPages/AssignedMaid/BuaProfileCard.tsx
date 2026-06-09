"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Phone, Shield, Star } from "lucide-react";
import { IHomeMaid } from "@/interfaces/maid";

export function BuaProfileCard({ bua }: { bua: IHomeMaid }) {
  return (
    <Card className="overflow-hidden border-2 border-primary/20">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <Avatar className="w-28 h-28 border-4 border-background shadow-xl">
              <AvatarImage
                src={bua?.profile_img}
                alt={bua?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {bua?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <Badge className="bg-green-500 text-white px-3 py-1 shadow-md">
                <BadgeCheck className="w-4 h-4 mr-1" />
                যাচাইকৃত
              </Badge>
            </div>
          </div>

          {/* Name & Rating */}
          <h2 className="font-bold text-2xl mt-2">{bua?.name}</h2>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-muted-foreground ml-2">(৪.৯ রেটিং)</span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ফোন নম্বর</p>
              <p className="font-medium">{bua?.phone_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">NID নম্বর</p>
              <p className="font-medium">{bua?.nid}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
