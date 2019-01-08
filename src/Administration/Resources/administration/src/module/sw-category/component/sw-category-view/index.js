import { Component } from 'src/core/shopware';
import template from './sw-category-view.html.twig';
import './sw-category-view.less';

Component.register('sw-category-view', {
    template,

    props: {
        category: {
            type: Object,
            required: true,
            default: {}
        },
        mediaItem: {
            type: Object,
            required: false,
            default: null
        },
        isLoading: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            // console.log(this.category);
        },

        onUploadAdded({ uploadTag }) {
            this.$emit('sw-category-view-on-upload-media', uploadTag);
        },

        setMediaItem(mediaItem) {
            this.$emit('sw-category-view-on-set-media', mediaItem);
        },

        openMediaSidebar() {
            this.$refs.mediaSidebarItem.openContent();
        }
    }
});
