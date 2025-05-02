import type { ComponentInternalInstance } from 'vue'
import { useSelectorQuery } from './use-selector-query'

export function useRect(selector: string, instance?: ComponentInternalInstance): Promise<UniApp.NodeInfo> {
  const { getSelectorNodeInfo } = useSelectorQuery(instance)
  return getSelectorNodeInfo(selector)
}
