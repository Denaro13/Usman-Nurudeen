"use client";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Experience, Project } from "@/lib/types";
import Image from "next/image";
import { Upload } from "lucide-react";
import { getProjects } from "@/lib/api/project";
import { se } from "date-fns/locale";

interface ProjectFormData {
  title: string;
  description: string;
  details: string;
  image: File | undefined;
  techStack: string;
  category: string;
  url: string;
  github: string;
}

export function AddProject({
  setProjects,
}: {
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectImage, setProjectImage] = useState<{
    image: File | undefined;
    url: string;
  }>({
    url: "",
    image: undefined,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      details: "",
      category: "",
      techStack: "",
    },
  });

  const { control, setValue, handleSubmit, reset } = form;

  const onProjectImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const previewUrl = URL.createObjectURL(file as File);
    setProjectImage((prev) => ({ ...prev, image: file, url: previewUrl }));
    setValue("image", file);
  };

  const removeProjectImage = () => {
    setProjectImage({ image: undefined, url: "" });
    setValue("image", undefined);
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);

    const techStack = data.techStack.split(",").map((item) => item.trim());
    console.log("Tech Stack:", techStack);

    const sentData = {
      title: data.title,
      description: data.description,
      details: data.details,
      techStack,
      category: data.category,
      url: data.url,
      github: data.github,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(sentData));
      if (data.image) {
        formData.append("image", data.image);
      }
      const response = await fetch("/api/project", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      // ✅ Manually throw on non-OK response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success(responseData.message);
      const projects = await getProjects();
      setProjects(projects);
      setProjectImage({ image: undefined, url: "" });
      setOpen(false);
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
      <Button onClick={() => setOpen(true)}>Add Project</Button>

      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setProjectImage({ image: undefined, url: "" });
          reset();
        }}
      >
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
              {/* Role / Title */}
              <FormField
                control={control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input placeholder="Project Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea
                        placeholder="short description about the project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="details"
                rules={{ required: "Details is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Project Detail</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Full details about the project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={control}
                  name="techStack"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Tech Stack</Label>
                      <FormControl>
                        <Input placeholder="React, Node.js, etc." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label>Category</Label>
                      <FormControl>
                        <Input placeholder="eg. EdTech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Project URL</Label>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="github"
                  rules={{ required: "GitHub link is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label>GitHub Link</Label>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center justify-center">
                {projectImage.url ? (
                  <div className="w-fit flex flex-col items-center gap-3">
                    <Image
                      src={projectImage.url}
                      alt="project image"
                      width={500}
                      height={100}
                    />
                    <Button
                      variant={"ghost"}
                      onClick={removeProjectImage}
                      className=" bg-red-400 text-xs py-1 px-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-fit mb-4 flex flex-col items-center gap-3 cursor-pointer border-2 py-3 px-6"
                  >
                    <Input
                      // {...register("image")}
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={onProjectImageChange}
                    />
                    <Upload className="text-gray-500 w-6 h-6" />{" "}
                    <p>Click here to upload project image</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Add..." : "Add Project"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
