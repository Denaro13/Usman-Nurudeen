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
// import { Experience } from "@/app/admin/page";
import { getExperiences } from "@/lib/api/experience";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { Experience } from "@/lib/types";

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return "";
//   }
//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: { value: string }[];
}

export function AddExperience({
  setExperiences,
}: {
  setExperiences: React.Dispatch<
    React.SetStateAction<Experience[] | undefined>
  >;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openStartCal, setOpenStartCal] = useState(false);
  const [openEndCal, setOpenEndCal] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const form = useForm<ExperienceFormData>({
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

  const onSubmit = async (data: ExperienceFormData) => {
    if (!startDate) {
      return toast.error("Start date is required");
    }
    setIsLoading(true);
    // console.log("Experience Data:", data);
    const achievements = data.achievements.map(
      (achievement) => achievement.value
    );
    console.log(achievements);
    const sentData = {
      title: data.title,
      company: data.company,
      location: data.location,
      startDate,
      endDate,
      achievements,
    };
    // console.log(sentData);

    try {
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sentData }),
      });

      // ✅ Manually throw on non-OK response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success(responseData.message);
      const experiences = await getExperiences();
      setExperiences(experiences);
      setOpen(false);
      setStartDate(undefined);
      setEndDate(undefined);
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Error:", error);
      // toast.error(error.message || "An unexpected error occurred");
      if (error.message === "Validation failed") {
        toast.error("Please check your input fields");
      } else {
        toast.error(error.message || "Server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Experience</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
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
              {/* <div className="grid grid-cols-2 gap-2">
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
              </div> */}

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <Label>Start Date</Label>
                  <div className="relative flex gap-2">
                    <Input
                      id="date"
                      value={formatDate(startDate)}
                      placeholder="June 01, 2025"
                      className="bg-background pr-10"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        // setValue(e.target.value);
                        if (isValidDate(date)) {
                          setStartDate(date);
                          // setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenStartCal(true);
                        }
                      }}
                    />
                    <Popover open={openStartCal} onOpenChange={setOpenStartCal}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={startDate}
                          captionLayout="dropdown"
                          // month={month}
                          // onMonthChange={setMonth}
                          onSelect={(date) => {
                            setStartDate(date);
                            // setValue(formatDate(date));
                            setOpenStartCal(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>End Date</Label>
                  <div className="relative flex gap-2">
                    <Input
                      id="date"
                      value={formatDate(endDate)}
                      placeholder="Present"
                      className="bg-background pr-10"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        // setValue(e.target.value);
                        if (isValidDate(date)) {
                          setEndDate(date);
                          // setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenEndCal(true);
                        }
                      }}
                    />
                    <Popover open={openEndCal} onOpenChange={setOpenEndCal}>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-picker"
                          variant="ghost"
                          className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                          <CalendarIcon className="size-3.5" />
                          <span className="sr-only">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={endDate}
                          captionLayout="dropdown"
                          // month={month}
                          // onMonthChange={setMonth}
                          onSelect={(date) => {
                            setEndDate(date);
                            // setValue(formatDate(date));
                            setOpenEndCal(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
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
                  {isLoading ? "Add..." : "Add Experience"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
