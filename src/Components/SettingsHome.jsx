
function SettingsHome() {

    return (
        <div className="setting setting_home">
            <h2>О пользователе</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                <p>Позиция в рейтинге:</p>
                <p>Оценок поставлено:</p>
                <p>Оценок получен:</p>
                <p>Максимальная полученная оценка:</p>
                <p>Минимальная полученная оценка:</p>
                <h3>СКОРО</h3>

            </div>
        </div>
    )
}


export {SettingsHome}