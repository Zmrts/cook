import { easeInOut, motion } from "framer-motion"
function SettingEmail() {

    return (
        <motion.div
        className="setting settings_Email"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        
        transition={{ duration: 0.3, ease: easeInOut}}
      >
        <h2>EMail</h2>
        <p>Изменить Email</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quae officia esse totam iusto deleniti eaque sequi ducimus. Deleniti id eveniet voluptatum fugit! Saepe, dolorem.</p>
    </motion.div>
    )
}

export {SettingEmail}