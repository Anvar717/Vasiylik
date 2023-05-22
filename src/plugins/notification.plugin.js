import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
 const Notification = {
    install(Vue,options){
        Vue.prototype.$makeToast = function(message,variant){
            this.$toast({
                component: ToastificationContent,
                props: {
                  title: message,
                  icon: variant == "success" ? "CheckSquareIcon" : 'AlertCircleIcon',
                  variant: variant,
                },
            });
        }
    }
}
export default Notification