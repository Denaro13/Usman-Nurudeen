"use client";
import { PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  subject: z.string().min(2).max(100),
  message: z.string().min(10).max(500),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values }),
      });
      const data = await response.json();
      // console.log(data);
      toast.success(data.message);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id="contact" className=" w-full py-16 bg-gray-100">
      <div className="container mx-auto max-w-6xl grid px-4 md:grid-cols-2 items-center gap-8">
        <div className="w-full flex flex-col items-center md:block ">
          <span className="text-lg border border-amber-200 px-4 py-2 rounded-full">
            Contact
          </span>
          <h4 className="mt-4 text-3xl font-bold">Get In Touch</h4>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex gap-4 items-center">
              <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <PhoneCallIcon size={20} />
              </span>
              <p>08155835284</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <Image
                  src={"/whatsapp.png"}
                  alt="whatsapp icon"
                  width={20}
                  height={20}
                />
              </span>
              <p>08089662470</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                <Image
                  src={"/gmail.png"}
                  alt="whatsapp icon"
                  width={20}
                  height={20}
                />
              </span>
              <span> usmannurudeen13@gmail.com</span>
            </div>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Mail Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        {...field}
                        rows={4}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
