import Vuetify from 'vuetify'
import ConfirmDialog from '@/components/ConfirmDialog'
import flushPromises from 'flush-promises'

import { createLocalVue, shallowMount, mount } from '@vue/test-utils'


describe('Тест окна подтверждения действия', () => {
    const localVue = createLocalVue();
    let vuetify;

    beforeEach(() => {
    vuetify = new Vuetify();
    });

    it('Тест подтверждения', async () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
            vuetify,
        });
        let result

        wrapper.vm.open().then(res => {result = res})
        wrapper.vm.agree()
        await flushPromises()

        expect(result).toBe(true)
    })

    it('Тест отмены', async () => {
        const wrapper = mount(ConfirmDialog, {
            localVue,
            vuetify,
        });
        let result

        wrapper.vm.open().then(res => {result = res})
        wrapper.vm.cancel()
        await flushPromises()

        expect(result).toBe(false)
    })

})