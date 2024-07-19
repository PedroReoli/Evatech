// Importing necessary modules and components from libraries and local files
import * as z from "zod";
import { ID, Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader, Loader } from "@/components/shared/";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import { appwriteConfig, storage } from "@/lib/appwrite/config";

// Define the type for PostFormProps
type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

// PostForm component definition
const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate(); // Hook for navigation
  const { toast } = useToast(); // Hook for displaying toast notifications
  const { user } = useUserContext(); // Hook to get the current user context

  // Setting up the form with validation
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // Queries
  const { mutateAsync: createPost, isLoading: isLoadingCreate } = useCreatePost(); // Mutation for creating a post
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } = useUpdatePost(); // Mutation for updating a post

  // Handler function for form submission
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    // Prepare file upload
    const file = value.file[0];
    if (!file) {
      toast({ title: "Por favor, adicione um arquivo." });
      return;
    }

    try {
      const imageId = ID.unique(); // Generate a unique ID for the image
      console.log('Generated imageId:', imageId);

      // Upload the file to storage
      const uploadedFile = await storage.createFile(appwriteConfig.storageId, imageId, file);
      console.log('Uploaded file:', uploadedFile);

      // Generate the URL for the uploaded image
      const imageUrl = storage.getFileView(appwriteConfig.storageId, imageId).href;
      console.log('Generated imageUrl:', imageUrl);

      if (!uploadedFile || !imageUrl) {
        throw new Error('File upload failed or URL generation failed');
      }

      // If action is "Update", update the existing post
      if (post && action === "Update") {
        const updatedPost = await updatePost({
          ...value,
          postId: post.$id,
          imageId: imageId,
          imageUrl: imageUrl,
        });

        if (!updatedPost) {
          toast({
            title: `${action} post failed. Please try again.`,
          });
        }
        return navigate(`/posts/${post.$id}`); // Navigate to the updated post
      }

      // If action is "Create", create a new post
      const newPost = await createPost({
        ...value,
        userId: user.id,
        imageId: imageId,
        imageUrl: imageUrl,
      });

      if (!newPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      console.error('Error during submission:', error);
      toast({ title: "Falha no upload do arquivo. Tente novamente." });
    }
  };

  // Render the PostForm component
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        
        {/* Caption field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* File upload field */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Adicionar</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl as unknown as string}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Location field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Credenciais do Material</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Aula (n* ): 'conteudo' "
                  type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Tags field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Adicionar Tags (separadas por virgula  " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Conhecendo a Internet, Criação De Curriculo , Excel ..."
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Form action buttons */}
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Exporting PostForm component as default
export default PostForm;
