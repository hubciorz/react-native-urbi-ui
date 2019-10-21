export {};

declare module 'react-native' {
  export interface ViewPropsAndroid {
    /**
     * Views that are only used to layout their children or otherwise don't draw anything
     * may be automatically removed from the native hierarchy as an optimization.
     * Set this property to false to disable this optimization and ensure that this View exists in the native view hierarchy.
     */
    collapsable?: boolean;

    /**
     * Whether this view needs to rendered offscreen and composited with an alpha in order to preserve 100% correct colors and blending behavior.
     * The default (false) falls back to drawing the component and its children
     * with an alpha applied to the paint used to draw each element instead of rendering the full component offscreen and compositing it back with an alpha value.
     * This default may be noticeable and undesired in the case where the View you are setting an opacity on
     * has multiple overlapping elements (e.g. multiple overlapping Views, or text and a background).
     *
     * Rendering offscreen to preserve correct alpha behavior is extremely expensive
     * and hard to debug for non-native developers, which is why it is not turned on by default.
     * If you do need to enable this property for an animation,
     * consider combining it with renderToHardwareTextureAndroid if the view contents are static (i.e. it doesn't need to be redrawn each frame).
     * If that property is enabled, this View will be rendered off-screen once,
     * saved in a hardware texture, and then composited onto the screen with an alpha each frame without having to switch rendering targets on the GPU.
     */
    needsOffscreenAlphaCompositing?: boolean;

    /**
     * Whether this view should render itself (and all of its children) into a single hardware texture on the GPU.
     *
     * On Android, this is useful for animations and interactions that only modify opacity, rotation, translation, and/or scale:
     * in those cases, the view doesn't have to be redrawn and display lists don't need to be re-executed. The texture can just be
     * re-used and re-composited with different parameters. The downside is that this can use up limited video memory, so this prop should be set back to false at the end of the interaction/animation.
     */
    renderToHardwareTextureAndroid?: boolean;

    /**
     * (Android-only) Sets the elevation of a view, using Android's underlying elevation API.
     *
     * This adds a drop shadow to the item and affects z-order for overlapping views. Only supported on Android 5.0+, has no effect on earlier versions.
     */
    elevation?: number;
  }
}
