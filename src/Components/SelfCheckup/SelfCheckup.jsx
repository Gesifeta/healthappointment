import React from 'react'

import "./SelfCheckup.css"

const SelfCheckUp = () => {
    return (
        <section className="app__self-checkup">
            <h1>Health Self-Checks for Wellness Maintenance</h1>
            <div className="app__self-checkup--item">
                <img src="https://cdn.pixabay.com/photo/2020/08/03/09/39/medical-5459631_1280.png" alt="" />
                <div>
                    <p style={{ color: "#fff", backgroundColor: "blue", padding: "2rem", borderRadius: "10px", marginRight: "2rem" }}>Like keeping an automobile fine-tuned, we have a role in our own health maintenance with regular health self-checks. Being aware of our bodies helps us know what changes may need to be evaluated by a doctor.
                        Early detection of many health changes results in better long-term outcomes. Also, body changes can signal treatable illnesses like cancer, heart problems and other issues.
                        To know what to look for, learn of any risk factors or family history of health conditions. Knowing your risks will also help your doctor suggest any lifestyle changes that could help lessen these risks.</p>
                </div></div>
            <div className="app__self-checkup--item">
                <img src="https://cdn.pixabay.com/photo/2021/11/21/06/16/female-6813278_640.png" alt="" />

                <div>
                    <h2>Health Self-Checks for Wellness: Setting the Baseline</h2>

                    <ul>
                        <li>    Like keeping an automobile fine-tuned, we have a role in our own health maintenance with regular health self-checks. Being aware of our bodies helps us know what changes may need to be evaluated by a doctor.</li>

                        <li>   Early detection of many health changes results in better long-term outcomes. Also, body changes can signal treatable illnesses like cancer, heart problems and other issues.
                        </li>
                        <li>  To know what to look for, learn of any risk factors or family history of health conditions. Knowing your risks will also help your doctor suggest any lifestyle changes that could help lessen these risks.</li>

                    </ul>
                </div>
            </div>
            <div className="app__self-checkup--item">
                <img src="https://cdn.pixabay.com/photo/2021/11/20/03/17/doctor-6810751_1280.png" alt="" />
                <div>
                    <h2>Health Self-Checks for Abnormalities</h2>
                    <ul>
                        <li> After you have established your baselines, set up regular health self-checks for what might not be normal. As a result, finding any abnormalities early can lead to better treatment outcomes.</li>

                        <li>Testicular and breast checks are important to discover lumps or swelling that may indicate cancer.</li>
                        <li>Waist fat measurements. Too much fat around your waist can increase the risk of cardiovascular disease, insulin resistance and type 2 diabetes. Measure your waist at the level of your belly button. If your waist is 37 inches or more for men and 31.4 inches or more for women, you may be at risk, and should talk to your doctor about weight management.
                            Skin cancer is one of the most common forms of cancer you can screen for yourself. Look for new growths or moles that have changed, bleed, itch, burn or crust over. If you are fair skinned, have family history or spend a lot of time in the sun, you may also want to get checked annually by a dermatologist.</li>
                        <li>Check your skin, hair and nails, as subtle changes can suggest things happening internally, nutritional imbalances or more serious issues such as a thyroid problem. Excessively dry skin, rough scaly patches or redness could be eczema, psoriasis or rosacea, but they can also offer clues about how your digestion and detox systems are functioning. Your doctor can determine the underlying causes of changes in skin, hair and nails and recommend treatments.</li>
                    </ul>
                </div>

            </div>
            <div>
                <h2>Summary</h2>
                <p>It is beneficial to keep an eye on your own health. Also, it is also important to have a good relationship with a primary care provider. Your doctor will also consider your risk factors and maintain a complete picture of your overall health. Health self-checks help you catch potential health problems early. Evaluation by a doctor makes health self-checks most effective.</p>
            </div>
        </section>
    )
}

export default SelfCheckUp