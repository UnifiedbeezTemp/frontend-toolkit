"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Loader from './Loader';
import Player from "lottie-react";
import animationData from "../../animations/Preloader.json";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated && !isLoading) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center layout- body">
        <Player
          autoplay
          loop
          animationData={animationData}
          style={{ height: 300 }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}