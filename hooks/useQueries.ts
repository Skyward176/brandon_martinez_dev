import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTechs,
  fetchTags,
  fetchProjects,
  fetchBlogPosts,
  createTech,
  updateTech,
  deleteTech,
  createTag,
  updateTag,
  deleteTag,
  createProject,
  updateProject,
  deleteProject,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  Tech,
  Tag,
  Project,
  BlogPost,
} from '@/lib/api';

// Query keys
export const QUERY_KEYS = {
  TECHS: ['techs'],
  TAGS: ['tags'],
  PROJECTS: ['projects'],
  BLOG_POSTS: ['blogPosts'],
} as const;

// Tech hooks
export const useTechs = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TECHS,
    queryFn: fetchTechs,
  });
};

export const useCreateTech = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTech,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TECHS });
    },
  });
};

export const useUpdateTech = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tech> }) => 
      updateTech(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TECHS });
    },
  });
};

export const useDeleteTech = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTech,
    onMutate: async (techId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TECHS });
      
      // Snapshot previous value
      const previousTechs = queryClient.getQueryData<Tech[]>(QUERY_KEYS.TECHS);
      
      // Optimistically update
      queryClient.setQueryData<Tech[]>(QUERY_KEYS.TECHS, (old) =>
        old?.filter((tech) => tech.id !== techId) || []
      );
      
      return { previousTechs };
    },
    onError: (err, techId, context) => {
      // Rollback on error
      if (context?.previousTechs) {
        queryClient.setQueryData(QUERY_KEYS.TECHS, context.previousTechs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TECHS });
    },
  });
};

// Tags hooks
export const useTags = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TAGS,
    queryFn: fetchTags,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tag> }) => updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS });
    },
  });
};

// Projects hooks
export const useProjects = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: fetchProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProject,
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROJECTS });
      
      const previousProjects = queryClient.getQueryData<Project[]>(QUERY_KEYS.PROJECTS);
      
      queryClient.setQueryData<Project[]>(QUERY_KEYS.PROJECTS, (old) =>
        old?.filter((project) => project.id !== projectId) || []
      );
      
      return { previousProjects };
    },
    onError: (err, projectId, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(QUERY_KEYS.PROJECTS, context.previousProjects);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
    },
  });
};

// Blog posts hooks
export const useBlogPosts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BLOG_POSTS,
    queryFn: fetchBlogPosts,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOG_POSTS });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogPost> }) => 
      updateBlogPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOG_POSTS });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlogPost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.BLOG_POSTS });
      
      const previousPosts = queryClient.getQueryData<BlogPost[]>(QUERY_KEYS.BLOG_POSTS);
      
      queryClient.setQueryData<BlogPost[]>(QUERY_KEYS.BLOG_POSTS, (old) =>
        old?.filter((post) => post.id !== postId) || []
      );
      
      return { previousPosts };
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(QUERY_KEYS.BLOG_POSTS, context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOG_POSTS });
    },
  });
};
