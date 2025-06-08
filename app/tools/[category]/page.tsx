import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { ToolsPage } from "@/components/tools/tools-page"
import { toolCategories } from "@/lib/tool-categories"

interface ToolsPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return toolCategories.map((category) => ({
    category: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }))
}

export async function generateMetadata({ params }: ToolsPageProps): Promise<Metadata> {
  const category = toolCategories.find(
    cat => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.category
  )

  if (!category) {
    return {
      title: 'Category Not Found - Case Master Pro',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${category.name} - Text Tools & Utilities | Case Master Pro`,
    description: `${category.description}. Collection of free online tools for text manipulation and formatting.`,
    keywords: [
      category.name.toLowerCase(),
      'text tools',
      'online tools',
      'free tools',
      ...category.tools.map(tool => tool.name.toLowerCase()),
    ].filter(Boolean),
    openGraph: {
      title: `${category.name} - Text Tools & Utilities`,
      description: category.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - Text Tools & Utilities`,
      description: category.description,
    },
  }
}

export default function Page({ params }: ToolsPageProps) {
  const category = toolCategories.find(
    cat => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.category
  )

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <ToolsPage category={category} />
      </main>
    </div>
  )
}