import React, { ComponentType } from 'react'
import { createRenderer } from 'react-test-renderer/shallow'

export const setupJestShallow = ({ Component, props }: { Component: ComponentType<any>, props: any }) => {
  const shallowRenderer = createRenderer()

  shallowRenderer.render(<Component {...props} />)

  const wrapper = shallowRenderer.getRenderOutput()
  const instance = shallowRenderer.getMountedInstance() as any

  return {
    wrapper: { ...wrapper, instance: () => instance }
  }
}
