<script lang="ts">
  // please use this instead
  // import { enhance } from '$app/forms'

  type Submit = (params: SubmitParams) => void
  type SubmitParams = {
    formElement: HTMLFormElement
    formData: FormData
  }

  function enhance(formEl: HTMLFormElement, submit: Submit) {
    async function handleSubmit(e: SubmitEvent) {
      // prevent default form submit
      e.preventDefault()

      // get the submitted form data
      const data = new FormData(formEl)

      // hit the endpoint at forms/+page.server.ts
      const response = await fetch(formEl.action, {
        method: formEl.method,
        body: data,
      })

      // get the response as JSON
      console.log(await response.json())

      // invoke callback
      submit({ formElement: formEl, formData: data })
    }

    // add event listener
    formEl.addEventListener('submit', handleSubmit)

    return {
      destroy() {
        // cleanup
        formEl.removeEventListener('submit', handleSubmit)
      },
    }
  }
</script>

<form
  method="POST"
  use:enhance={({ formElement, formData }) => {
    console.log(formElement, formData)
  }}
>
  <input name="value" type="text" />
  <button>Submit</button>
</form>

<style>
  form {
    display: grid;
    gap: 1rem;
  }
</style>
