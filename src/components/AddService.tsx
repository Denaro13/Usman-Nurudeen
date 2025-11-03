"use client";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface ServiceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: { value: string }[];
}

export function AddService() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ServiceFormData>({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      achievements: [{ value: "" }],
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    console.log("Experience Data:", data);
    try {
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const responseData = await response.json();
      console.log(responseData);
      toast.success(responseData.message);
      // setOpen(false);
      // reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Service</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
              {/* Role / Title */}
              <FormField
                control={control}
                name="title"
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Role / Title</Label>
                    <FormControl>
                      <Input placeholder="Full Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={control}
                name="company"
                rules={{ required: "Company is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Company</Label>
                    <FormControl>
                      <Input placeholder="Precise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Location</Label>
                    <FormControl>
                      <Input placeholder="Hybrid, Lagos, Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={control}
                  name="startDate"
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Start Date</Label>
                      <FormControl>
                        <Input placeholder="Jun 2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <Label>End Date</Label>
                      <FormControl>
                        <Input placeholder="Present" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Achievements */}
              <div>
                <Label className="mb-2">Key Achievements</Label>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`achievements.${index}.value`}
                      rules={{
                        required: "Please describe an achievement",
                        minLength: { value: 10, message: "Too short" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Spearheaded the design and development of..."
                              {...field}
                              className="min-h-[70px]"
                            />
                          </FormControl>
                          <FormMessage />
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </FormItem>
                      )}
                    />
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ value: "" })}
                  >
                    + Add Another Achievement
                  </Button>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  Save Experience
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
