export default ({ spacing, colors, typography }) => ({
  width: spacing.formFieldHeight,
  padding: 0,
  borderWidth: 0,
  shadow: 'none',
  fontSize: typography.fontSize.xLarge,

  primary: {
    focusColor: colors.focus
  },

  secondary: {
    focusColor: colors.focus
  },

  neutral: {
    focusColor: colors.focus
  }
})
