<?php declare(strict_types=1);

namespace Shopware\Core\Content\Newsletter\Aggregate\NewsletterRecipientTag;

use Shopware\Core\Content\Newsletter\Aggregate\NewsletterRecipient\NewsletterRecipientDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;
use Shopware\Core\System\Tag\TagDefinition;

class NewsletterRecipientTagDefinition extends MappingEntityDefinition
{
    public function getEntityName(): string
    {
        return 'newsletter_recipient_tag';
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('newsletter_recipient_id', 'newsletterRecipientId', NewsletterRecipientDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('tag_id', 'tagId', TagDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('newsletterRecipient', 'newsletter_recipient_id', NewsletterRecipientDefinition::class, 'id', false),
            new ManyToOneAssociationField('tag', 'tag_id', TagDefinition::class, 'id', false),
        ]);
    }
}
