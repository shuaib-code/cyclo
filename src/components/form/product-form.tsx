/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useUploadFileMutation } from "@/redux/features/upload/uploadApi";
import { CloudUpload, Paperclip } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Rating } from "../ui/rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const bicycleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  model: z.string().min(1, "Model is required"),
  price: z.coerce.number().min(1, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  category: z.string().min(2, "Category is required"),
  images: z.any(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5"),
});

export default function ProductForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [uploadFile] = useUploadFileMutation();
  const [createBicycle, { isLoading }] = useCreateProductMutation();
  const [files, setFiles] = useState<File[] | null>(null);
  const form = useForm<z.infer<typeof bicycleSchema>>({
    resolver: zodResolver(bicycleSchema),
    defaultValues: {
      rating: 0,
    },
  });
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const handleFileUpload = async () => {
    if (!files) {
      toast.warning("Please select a file");
      return null;
    }

    const uploadingToast = toast.loading("Uploading file...");
    try {
      const res = await uploadFile(files[0]).unwrap();
      if (res) {
        toast.success("File uploaded successfully!");
        return res.url;
      }
    } catch (e) {
      toast.error("Error uploading file!");
      return null;
    } finally {
      toast.dismiss(uploadingToast);
    }
  };

  const onSubmit = async (values: z.infer<typeof bicycleSchema>) => {
    const uploadedImage = await handleFileUpload(); // Wait for upload
    if (!uploadedImage) return; // Stop submission if upload fails

    try {
      const res = await createBicycle({
        ...values,
        images: [uploadedImage],
      }).unwrap();
      if (res?.success) {
        toast.success("Bicycle added successfully!", { duration: 1500 });
        form.reset({
          rating: 0,
          brand: "",
          model: "",
          stock: 0,
          images: [],
          name: "",
          price: 0,
          description: "",
          category: "",
        });
        setFiles(null);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong", { duration: 3000 });
    }
  };

  return (
    <Form {...form}>
      <form
        className={
          "space-y-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10" +
          className
        }
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Add New Bicycle</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter the bicycle details below
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bicycle Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {/* Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trek">Trek</SelectItem>
                        <SelectItem value="giant">Giant</SelectItem>
                        <SelectItem value="specialized">Specialized</SelectItem>
                        <SelectItem value="cannondale">Cannondale</SelectItem>
                        <SelectItem value="merida">Merida</SelectItem>
                        <SelectItem value="bmc">BMC</SelectItem>
                        <SelectItem value="cube">Cube</SelectItem>
                        <SelectItem value="scott">Scott</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Model */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Bicycle Model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bicycle category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bicycle category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Road">Road</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="BMX">BMX</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of cycle you want.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Select File</FormLabel>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>
                <FormDescription>Select a file to upload.</FormDescription>
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
                    placeholder="Description of the bicycle"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide your product description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Rating</FormLabel>
                <FormControl className="w-full">
                  <Rating {...field} />
                </FormControl>
                <FormDescription>Please provide your rating.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          {isLoading ? (
            <>
              <svg
                className="mr-3 size-5 animate-spin ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing…
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
