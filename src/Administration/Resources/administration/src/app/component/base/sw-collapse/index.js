import template from './sw-collapse.html.twig';

/**
 * @public
 * @description A container which creates a collapsible list of items.
 * @status ready
 * @example-type static
 * @component-example
 * <sw-collapse>
 *     <div slot="header">Header slot</div>
 *     <div slot="content">Content slot</div>
 * </sw-collapse>
 */
export default {
    name: 'sw-collapse',
    template,

    props: {
        expandOnLoading: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            expanded: this.expandOnLoading
        };
    },

    methods: {
        collapseItem() {
            this.expanded = !this.expanded;
        }
    }
};
