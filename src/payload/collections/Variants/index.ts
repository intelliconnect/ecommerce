import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'


const Variants: CollectionConfig = {
    slug: 'variants',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'stripeProductID', '_status'],
        preview: doc => {
            return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
                `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
            )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
        },
    },

    versions: {
        drafts: true,
    },
    access: {
        read: () => true,
        create: admins,
        update: admins,
        delete: admins,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'publishedOn',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
      
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'relatedProducts',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            filterOptions: ({ id }) => {
                return {
                    id: {
                        not_in: [id],
                    },
                }
            },
        },
        slugField(),
        {
            name: 'skipSync',
            label: 'Skip Sync',
            type: 'checkbox',
            admin: {
                position: 'sidebar',
                readOnly: true,
                hidden: true,
            },
        },
    ],
}

export default Variants