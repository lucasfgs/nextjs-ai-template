import { useUIStore } from '@/store/ui.store'

describe('useUIStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useUIStore.setState({ sidebarOpen: true })
  })

  it('starts with the sidebar open', () => {
    expect(useUIStore.getState().sidebarOpen).toBe(true)
  })

  it('toggles the sidebar state', () => {
    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarOpen).toBe(false)

    useUIStore.getState().toggleSidebar()
    expect(useUIStore.getState().sidebarOpen).toBe(true)
  })

  it('sets the sidebar state directly', () => {
    useUIStore.getState().setSidebarOpen(false)
    expect(useUIStore.getState().sidebarOpen).toBe(false)
  })
})
