import Link from 'next/link'
import { getSettingsNavigationItems } from '@/config/navigation'
import { templateContent } from '../template-content'

export function TemplateSettingsOverview() {
  const settingsItems = getSettingsNavigationItems()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{templateContent.settings.title}</h1>
        <p className="text-muted-foreground">{templateContent.settings.description}</p>
      </div>

      <div className="space-y-2">
        {settingsItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:bg-accent flex items-center justify-between rounded-lg border p-4 transition-colors"
          >
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
