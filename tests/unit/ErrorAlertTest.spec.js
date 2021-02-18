import Vuetify from 'vuetify'
import ErrorAlert from '@/components/ErrorAlert'
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

    it('Тест установки обработчика событий при монтировании', () => {
        const wrapper = shallowMount(ErrorAlert, {
            localVue,
            vuetify,
            mocks
        });

        expect(wrapper.vm.$eventBus.$on).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$eventBus.$on).toHaveBeenCalledWith(ON_APP_ERROR, wrapper.vm.open);
    });

    it('Тест метода open', () => {
        const wrapper = shallowMount(ErrorAlert, {
            localVue,
            vuetify,
            mocks
        });
        const expected_message = 'Test message';

        wrapper.vm.open(expected_message);

        expect(wrapper.vm.showAlert = true);
        expect(wrapper.vm.message = expected_message);
    });
})