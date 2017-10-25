<?php declare(strict_types=1);

namespace Shopware\PaymentMethod\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class PaymentMethodCountryWrittenEvent extends EntityWrittenEvent
{
    const NAME = 'payment_method_country.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 'payment_method_country';
    }
}
