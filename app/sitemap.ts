import { MetadataRoute } from 'next'
import { BASE_URL } from '@/components/services/baseurl'
// import { blogPosts } from './blog/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // const blogRoutes = Object.keys(blogPosts).map((slug) => ({
    //     url: `${BASE_URL}/blog/${slug}`,
    //     lastModified: new Date().toISOString(),
    //     changeFrequency: 'weekly' as const,
    //     priority: 0.8,
    // }))

    const routes = [
        {
            url: BASE_URL,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/urls`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }
    ]

    return [...routes]
}