
<template>
    <div class="flex flex-row">
        <div class="w-2">
            <MainMenu/>
        </div>
        
        <slot/>
    </div>
</template>

<script setup>
const userToken = useCookie('token')
const token = "Bearer " + userToken.value
console.log(token)
const { data: responseData } = await useFetch('http://ec2-18-205-246-50.compute-1.amazonaws.com:8080/api/v1/admin/me', {
                headers: {
                    "Authorization": token
                },
                method: 'get'
            })
if (responseData.value === null) {
    console.log('not fine')
    navigateTo("/signin")
}
if (responseData.value.responseCode === 200) {
    console.log('fine from layout')
  } else {
    console.log('not fine')
    navigateTo("/signin")
  }

</script>

<style>

</style>