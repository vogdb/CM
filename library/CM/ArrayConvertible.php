<?php

interface CM_ArrayConvertible {

    /**
     * Object representation as array
     *
     * @return array
     */
    public function toArrayIdOnly();

    /**
     * Return object from array-representation
     *
     * @param array $array
     * @return object
     */
    public static function fromArray(array $array);
}
