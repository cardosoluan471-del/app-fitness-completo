"use client";

import { useState, useEffect } from "react";
import { 
  Dumbbell, 
  Apple, 
  Brain, 
  Droplets, 
  TrendingUp, 
  Users, 
  Sparkles,
  Heart,
  Target,
  Zap,
  Moon,
  Activity,
  Award,
  ChevronRight,
  Play,
  CheckCircle2,
  Menu,
  X,
  Globe,
  Star,
  Trophy,
  Flame,
  Clock,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MentalWellnessSection from "@/components/custom/mental-wellness-section";
import PricingSection from "@/components/custom/pricing-section";
import SocialShare from "@/components/custom/social-share";

export const revalidate = 60; // Revalidar a cada 60 segundos para otimização

export default function Home() {