export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const value = data.get('value')

    // do whatever you want
    console.log(value)

    return { success: true }
  },
}
