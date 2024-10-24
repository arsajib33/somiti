'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ceredntialLogin } from "@/backend/serverAction/loginAction";
export function LoginForm() {

    const [error, setError] = useState("");


    const router = useRouter();
  
    async function onSubmit(event) {
      event.preventDefault();
  
      try {
        setError('')
        const formData = new FormData(event.currentTarget);
        const response = await ceredntialLogin(formData);
  
        if (!!response.error) {
          console.error(response.error)
          setError(response.error);
        } else {
          router.push("/courses");
        }
      } catch (e) {
        setError(e.message);
      }
    }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={onSubmit}>
      <div className="grid gap-4">
       {error &&  <p className="p-2 bg-red-300 rounded-sm">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
       
      </CardContent>
    </Card>
  );
}