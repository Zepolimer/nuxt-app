import { defineComponent, ref } from 'vue';
import {
    QBtn,
    QDrawer,
    QHeader,
    QItem,
    QItemLabel,
    QList,
    QToolbar,
    QToolbarTitle
} from "quasar";


export default defineComponent({
    name: 'MenuDrawer',
    setup() {
        let toggleDrawer = ref<boolean>(false)

        let onToggle = () => {
            toggleDrawer.value = !toggleDrawer.value
        }

        return () => (
            <>
                <QHeader class={'header-container'}>
                    <QToolbar class={'header-toolbar'}>
                        <QBtn onClick={onToggle} icon={"menu"} />
                    </QToolbar>

                    <QToolbarTitle>TodoList</QToolbarTitle>
                </QHeader>

                <QDrawer v-model={toggleDrawer.value} show-if-above bordered={true}>
                    <QList>
                        <QItem href={"/"}>
                            <QItemLabel>Todos</QItemLabel>
                        </QItem>
                    </QList>
                    <QList>
                        <QItem href={"/task/add"}>
                            <QItemLabel>Add a task</QItemLabel>
                        </QItem>
                    </QList>
                </QDrawer>
            </>
        )
    }
})
