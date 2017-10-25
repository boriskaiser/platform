<?php declare(strict_types=1);

namespace Shopware\Framework\Event;

use Shopware\Framework\Write\EntityWrittenEvent;

class EmarketingVoucherCodesWrittenEvent extends EntityWrittenEvent
{
    const NAME = 's_emarketing_voucher_codes.written';

    public function getName(): string
    {
        return self::NAME;
    }

    public function getEntityName(): string
    {
        return 's_emarketing_voucher_codes';
    }
}
