import { easeInOut, motion } from "framer-motion"
function SettingAvatar() {

    return (
        <motion.div
        className="setting settings_username"
        initial={{ opacity: 0}}
        animate={{ opacity: 1,  }}
        exit={{ opacity: 0, }}
        transition={{ duration: 0.2, ease: easeInOut}}
        
      >
        <h2>Setting AVATAR</h2>
        <p>AVATAR</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quae officia esse totam iusto deleniti eaque sequi ducimus. Deleniti id eveniet voluptatum fugit! Saepe, dolorem.</p>
    </motion.div>
    )
}

export {SettingAvatar}