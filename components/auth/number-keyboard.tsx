import { Fragment, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { BackspaceIcon } from "../icons";

interface NumberKeyBoardProps {
  length: number;
  value: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  onUpdate: (value: string) => void;
  onFinished?: (value: string) => void;
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function NumberKeyBoard ({ length, value, label, error, disabled = false, onFinished, onUpdate }: NumberKeyBoardProps) {
  const existPositionValue = useCallback((position: number) => {
    const positionValue = value.slice(position - 1, position);
    return positionValue !== undefined && positionValue !== '';
  }, [value]);
  
  if (length < 2) return null;

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          gap: 16,
        }}
      >
        {label !== undefined && (
          <Text
            style={{
              fontSize: 14,
              color: COLORS.white,
              textAlign: 'center'
            }}
          >
            {label}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {Array.from({ length }).map((_, index) => {
            const isPositionFilled = existPositionValue(index + 1);

            return (
              <View
                key={index}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: COLORS.white,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isPositionFilled && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: COLORS.primary,
                      borderRadius: 5,
                    }}
                  />
                )}
              </View>
            )
          })}
        </View>
        {error !== undefined && (
          <Text
            style={{
              fontSize: 14,
              color: COLORS.error,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 8,
        }}
      >
        {DIGITS.map((digit) => {
          return (
            <Fragment key={digit}>
              {digit === 0 && <Text style={{ width: '30%' }} />}
              <Pressable
                disabled={disabled}
                style={({ pressed }) => ({
                  width: '30%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 52,
                  borderRadius: 8,
                  backgroundColor: pressed ? COLORS.primaryForeground : undefined,
                })}
                onPress={() => {
                  if (value.length >= length) return;
                  
                  const newValue = `${value}${digit}`;
                  onUpdate(newValue);

                  if (newValue.length === length) onFinished?.(newValue);
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: COLORS.white,
                    fontWeight: 500
                  }}
                >
                  {digit}
                </Text>
              </Pressable>
              {digit === 0 && (
                <Pressable
                  disabled={disabled}
                  style={({ pressed }) => ({
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 52,
                    borderRadius: 8,
                    backgroundColor: pressed ? COLORS.primaryForeground : undefined,
                  })}
                  onPress={() => {
                    if (value.length === 0) return;
                    const newValue = value.slice(0, -1);
                    onUpdate(newValue);
                  }}
                >
                  <BackspaceIcon
                    width={24}
                    height={24}
                    color={COLORS.white}
                  />
                </Pressable>
              )}
            </Fragment>
          )
        })}
      </View>
    </View>
  )
}