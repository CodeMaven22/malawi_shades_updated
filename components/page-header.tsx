interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-xl text-muted-foreground">{description}</p>
    </div>
  )
}

