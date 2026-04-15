import type { CSSProperties, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type PageLeadProps = {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
}

type TokenItem = {
  name: string
  variable: string
  utility?: string
  value?: string
  description: ReactNode
  preview?: ReactNode
  previewLabel?: string
  previewVariable?: string
  previewForegroundVariable?: string
  previewBorderVariable?: string
  previewStyle?: CSSProperties
}

type RuleItem = {
  title: string
  body: ReactNode
}

type ComponentSection = {
  title: string
  description: ReactNode
  items: string[]
}

type ThemePreviewProps = {
  name: string
  description: string
  tokens?: Record<string, string>
  children: ReactNode
}

export function PageLead({ eyebrow = 'Style Guide', title, description, children }: PageLeadProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground max-w-3xl text-base leading-7">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export function TokenGrid({ items }: { items: TokenItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="bg-card text-card-foreground rounded-2xl border shadow-sm">
          <div className="p-4">
            {item.preview ?? (
              <div
                className="flex min-h-28 items-end justify-between rounded-xl border px-4 py-3"
                style={{
                  backgroundColor: `var(${item.previewVariable ?? item.variable})`,
                  color: item.previewForegroundVariable
                    ? `var(${item.previewForegroundVariable})`
                    : 'var(--foreground)',
                  borderColor: item.previewBorderVariable
                    ? `var(${item.previewBorderVariable})`
                    : 'var(--border)',
                  ...item.previewStyle,
                }}
              >
                <span className="text-sm font-medium">{item.name}</span>
                {item.previewLabel ? (
                  <span className="text-xs opacity-70">{item.previewLabel}</span>
                ) : null}
              </div>
            )}
          </div>
          <div className="space-y-3 border-t px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-mono text-[11px]">
                {item.variable}
              </Badge>
              {item.utility ? (
                <Badge variant="outline" className="font-mono text-[11px]">
                  {item.utility}
                </Badge>
              ) : null}
            </div>
            {item.value ? <p className="text-sm font-medium">{item.value}</p> : null}
            <p className="text-muted-foreground text-sm leading-6">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RuleGrid({ items, columns = 2 }: { items: RuleItem[]; columns?: 2 | 3 }) {
  return (
    <div className={cn('grid gap-4', columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-card text-card-foreground rounded-2xl border p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
          <div className="text-muted-foreground mt-2 text-sm leading-6">{item.body}</div>
        </div>
      ))}
    </div>
  )
}

export function DoDont({
  doTitle,
  doBody,
  dontTitle,
  dontBody,
}: {
  doTitle: string
  doBody: ReactNode
  dontTitle: string
  dontBody: ReactNode
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">Do</Badge>
          <h3 className="text-lg font-semibold tracking-tight">{doTitle}</h3>
        </div>
        <div className="text-sm leading-6">{doBody}</div>
      </div>
      <div className="rounded-2xl border border-red-500/25 bg-red-500/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Badge className="bg-red-600 text-white hover:bg-red-600">Don&apos;t</Badge>
          <h3 className="text-lg font-semibold tracking-tight">{dontTitle}</h3>
        </div>
        <div className="text-sm leading-6">{dontBody}</div>
      </div>
    </div>
  )
}

export function ComponentMatrix({ sections }: { sections: ComponentSection[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.title}
          className="bg-card text-card-foreground rounded-2xl border p-5 shadow-sm"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
            <p className="text-muted-foreground text-sm leading-6">{section.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {section.items.map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ThemePreview({ name, description, tokens, children }: ThemePreviewProps) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm" style={tokens as CSSProperties}>
      <div className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        <p className="text-muted-foreground text-sm leading-6">{description}</p>
      </div>
      <div className="bg-background text-foreground shadow-elevation-sm rounded-2xl border p-5">
        {children}
      </div>
    </div>
  )
}

export function Checklist({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="bg-card text-card-foreground rounded-xl border px-4 py-3 text-sm leading-6 shadow-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
