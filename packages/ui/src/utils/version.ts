let systemInfo: UniNamespace.GetSystemInfoResult

export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = uni.getSystemInfoSync()
  }

  return systemInfo
}

function compareVersion(v1: any, v2: any): number {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = Number.parseInt(v1[i], 10)
    const num2 = Number.parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    }
    if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function gte(version: string) {
  const system = getSystemInfoSync()

  return compareVersion(system.SDKVersion, version) >= 0
}

export function canIUseModel() {
  return gte('2.9.3')
}

export function canIUseFormFieldButton() {
  return gte('2.10.3')
}

export function canIUseAnimate() {
  return gte('2.9.0')
}

export function canIUseGroupSetData() {
  return gte('2.4.0')
}

export function canIUseNextTick() {
  try {
    return uni.canIUse('nextTick')
  }
  catch {
    return gte('2.7.1')
  }
}

export function canIUseCanvas2d() {
  return gte('2.9.0')
}

export function canIUseGetUserProfile() {
  return !!uni.getUserProfile
}
