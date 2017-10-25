<?php declare(strict_types=1);

namespace Shopware\Framework\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class AttributeConfigurationTranslationWrittenEvent extends EntityWrittenEvent
{
    const NAME = 'attribute_configuration_translation.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 'attribute_configuration_translation';
    }
}
