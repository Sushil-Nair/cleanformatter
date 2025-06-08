import { Metadata } from 'next'
import { notFound, redirect } from "next/navigation"
import { Header } from "@/components/header"
import { ToolsPage } from "@/components/tools/tools-page"
import { toolCategories } from "@/lib/tool-categories"
import { Footer } from "@/components/sections/footer"

interface ToolPageProps {
  params: {
    category: string
    tool: string
  }
}

export async function generateStaticParams() {
  return toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      category: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tool: tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }))
  )
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const category = toolCategories.find(
    cat => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.category
  )

  const tool = category?.tools.find(
    t => t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.tool
  )

  if (!category || !tool) {
    return {
      title: 'Tool Not Found - Case Master Pro',
      description: 'The requested tool could not be found.',
    }
  }

  return {
    title: `${tool.name} - Free Online Text Tool | Case Master Pro`,
    description: `${tool.description}. Free online tool for text manipulation and formatting. No registration required.`,
    keywords: [
      tool.name.toLowerCase(),
      'text tool',
      'online tool',
      'free tool',
      ...tool.popularTools,
      category.name.toLowerCase(),
    ].filter(Boolean),
    openGraph: {
      title: `${tool.name} - Free Online Text Tool`,
      description: tool.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Free Online Text Tool`,
      description: tool.description,
    },
  }
}

export default function Page({ params }: ToolPageProps) {
  // If either category or tool is missing, redirect to the main tools page
  if (!params.category || !params.tool) {
    redirect('/tools')
  }

  const category = toolCategories.find(
    cat => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.category
  )

  if (!category) {
    notFound()
  }

  const tool = category.tools.find(
    t => t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === params.tool
  )

  if (!tool) {
    notFound()
  }

  const toolCategory = {
    ...category,
    tools: [tool]
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <ToolsPage category={toolCategory} />
      </main>
      <Footer />
    </div>
  )
}