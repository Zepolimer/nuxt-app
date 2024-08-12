import { defineComponent } from 'vue';
import "quasar/dist/quasar.css";
import {QBtn, QCard, QCardActions} from "quasar";

export default defineComponent({
    setup() {
        return () => (
            <div>
                <h1>HomePage</h1>
                <QCard dark bordered={true}>
                    <p>card ?</p>
                </QCard>

                <QBtn label={"Text btn"} color={"blue"} />
                {/*<q-btn color="secondary">btn</q-btn>*/}
            </div>
        )
    }
})