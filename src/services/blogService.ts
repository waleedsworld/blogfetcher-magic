
export interface BlogMetaTags {
  description: string;
  title: string;
}

export interface BlogPost {
  content: string;
  meta_tags: BlogMetaTags;
  mode: string;
  slug: string;
  timestamp: string;
  url: string;
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  try {
    const response = await fetch(`https://productdsp.techrealm.online/content/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}

// This is a mock function to simulate a list of recent blog posts
// In a real application, this would fetch from the API
export async function fetchRecentBlogPosts(): Promise<{ slug: string; title: string; description: string }[]> {
  return [
    {
      slug: "finest-official-licenses-partnered-2025",
      title: "Official Software Licensing Deals 2025 | Partnered with Microsoft",
      description: "Get the finest official licenses at our platform and experience the power of Microsoft-approved wholesale deals."
    },
    {
      slug: "windows-11-enterprise-licensing-guide",
      title: "Windows 11 Enterprise Licensing Guide 2025",
      description: "Everything you need to know about Windows 11 Enterprise licensing options for your business."
    },
    {
      slug: "office-365-vs-microsoft-365-comparison",
      title: "Office 365 vs Microsoft 365: Complete Comparison",
      description: "A detailed comparison between Office 365 and Microsoft 365 to help you choose the right solution."
    },
    {
      slug: "microsoft-server-licensing-explained",
      title: "Microsoft Server Licensing Explained Simply",
      description: "A simplified guide to understanding Microsoft Server licensing for IT professionals."
    },
    {
      slug: "azure-vs-aws-for-business",
      title: "Azure vs AWS: Which Cloud Service is Best for Your Business?",
      description: "Compare Microsoft Azure and Amazon Web Services to determine the best cloud solution for your business needs."
    },
    {
      slug: "volume-licensing-options-2025",
      title: "Volume Licensing Options for Businesses in 2025",
      description: "Explore the various volume licensing options available for businesses of all sizes in 2025."
    }
  ];
}
