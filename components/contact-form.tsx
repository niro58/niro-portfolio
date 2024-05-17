import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

export const contactFormSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  agree: z.boolean().optional()
});
export const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      description: ""
    }
  });

  //async function onSubmit(values: z.infer<typeof contactFormSchema>) {
  //  const res = await fetch("/api/email", {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json"
  //    },
  //    body: JSON.stringify(values)
  //  });
  //}
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.RESEND_API_KEY!
      },
      body: JSON.stringify(values)
    });
    const { message } = await res.json();
    if (res.ok && message !== "error") {
      toast.success("Email sent successfully");
    } else {
      toast.error("Error sending email");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-16 p-3"
      >
        <div className="flex flex-col gap-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Paul" {...field} />
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
                  <Input
                    type="email"
                    placeholder="example@xyz.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-64 resize-none"
                    placeholder="I want to contact you because . . . "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Use different settings for my mobile devices
                  </FormLabel>
                  <FormDescription>
                    I aggree with processing of my personal data
                    <Link href="/examples/forms">Terms and Conditions</Link>.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button variant="outline" type="submit" className="h-12 w-full text-lg">
          Submit
        </Button>
      </form>
    </Form>
  );
};
