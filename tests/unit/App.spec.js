import Vuetify from 'vuetify'
import ErrorAlert from '@/App'
import { ON_APP_ERROR } from '@/events/types'

import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('Тест ErrorAlert.vue', () => {
    const localVue = createLocalVue();
    let vuetify;
    // https://stackoverflow.com/questions/60338721/how-to-test-a-global-event-bus-in-vuejs
    const mocks = {
        $eventBus: {
            $on: jest.fn(),
            $emit: jest.fn(),
        },
    };

    beforeEach(() => {
        vuetify = new Vuetify();
    });
    
    it('Тест вызова окна с ошибкой.', async () => {
        const wrapper = shallowMount(ErrorAlert, {
            localVue,
            vuetify,
            mocks
        });

        const expected_message = wrapper.vm.errorMessage;

        await wrapper.find('.errorBtn').trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$eventBus.$emit).toHaveBeenCalledWith(ON_APP_ERROR, expected_message);

    })

})