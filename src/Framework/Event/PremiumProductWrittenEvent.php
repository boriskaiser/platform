<?php declare(strict_types=1);

namespace Shopware\Framework\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class PremiumProductWrittenEvent extends EntityWrittenEvent
{
    const NAME = 'premium_product.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 'premium_product';
    }
}
