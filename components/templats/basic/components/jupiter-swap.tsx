'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, VersionedTransaction } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ArrowDownIcon, RefreshCwIcon } from 'lucide-react'
import { TemplateFormData } from '@/schemas/templateSchema'
import { JupiterService } from '@/lib/services/jupiter-service'

export function JupiterSwap({ templateData }: { templateData: TemplateFormData }) {
  const [amount, setAmount] = useState<string>('0.1')
  const [outputAmount, setOutputAmount] = useState<string>('0')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false)
  const [swapStatus, setSwapStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { publicKey, signTransaction, connected } = useWallet()

  // Utiliser l'adresse du contrat du template
  const tokenAddress = templateData.contractAddress

  /**
   * Récupère un devis de swap
   */
  const fetchQuote = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0 || !tokenAddress) return

    setIsQuoteLoading(true)
    try {
      const quote = await JupiterService.getQuote(parseFloat(amount), tokenAddress)
      if (quote.outAmount) {
        setOutputAmount((parseInt(quote.outAmount) / 1e9).toFixed(4))
      } else {
        console.error('Réponse de devis invalide:', quote)
        setOutputAmount('0')
      }
    } catch (error) {
      console.error('Erreur de devis:', error)
      setOutputAmount('0')
    } finally {
      setIsQuoteLoading(false)
    }
  }, [amount, tokenAddress])

  /**
   * Exécute un swap
   */
  const handleSwap = async () => {
    if (!publicKey || !signTransaction || !amount || parseFloat(amount) <= 0 || !tokenAddress) return

    setIsLoading(true)
    setSwapStatus('idle')
    setErrorMessage('')

    try {
      // 1. Obtenir le devis
      const quote = await JupiterService.getQuote(parseFloat(amount), tokenAddress)

      // 2. Créer la transaction
      const swapResult = await JupiterService.createSwap({
        quoteResponse: quote,
        userPublicKey: publicKey.toString(),
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        dynamicSlippage: true,
        prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            maxLamports: 1000000,
            priorityLevel: "high"
          }
        }
      })

      if (!swapResult.swapTransaction) {
        throw new Error("Transaction invalide reçue de Jupiter")
      }

      // 3. Décoder la transaction versionnée
      const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, 'base64')
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf)

      // 4. Signer la transaction
      const signedTransaction = await signTransaction(transaction)

      // 5. Envoyer la transaction
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com')
      const txid = await connection.sendTransaction(signedTransaction)

      console.log('Transaction envoyée:', txid)
      setSwapStatus('success')
    } catch (error: unknown) {
      console.error('Erreur de swap:', error)
      setSwapStatus('error')
      setErrorMessage(error instanceof Error ? error.message : "Une erreur s'est produite lors du swap")
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer un devis au chargement
  useEffect(() => {
    if (connected && tokenAddress) {
      fetchQuote()
    }
  }, [connected, fetchQuote, tokenAddress])

  // Rendu du composant UI
  return (
    <section className="w-full max-w-md mx-auto px-4">
      <div className="bg-slate-800 border border-slate-700 shadow-md p-5 rounded-sm">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Jupiter Swap</h2>
            <div className="text-xs text-slate-400 px-2 py-1 bg-slate-700 rounded-sm">
              Powered by Jupiter
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Input SOL */}
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-sm">
            <div className="flex justify-between mb-2">
              <span className="text-slate-300 text-sm">From</span>
              <span className="text-slate-400 text-sm">Balance: 0 SOL</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                    setTimeout(() => fetchQuote(), 500)
                  }}
                  className="bg-transparent border-none text-lg text-white focus-visible:ring-0 p-0 h-auto"
                  placeholder="0.0"
                />
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 border border-slate-700 rounded-sm">
                <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                <span className="text-white">SOL</span>
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div className="flex justify-center">
            <div className="bg-slate-700 p-2 rounded-sm">
              <ArrowDownIcon className="h-4 w-4 text-slate-300" />
            </div>
          </div>

          {/* Output Token */}
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-sm">
            <div className="flex justify-between mb-2">
              <span className="text-slate-300 text-sm">To (estimated)</span>
              <button
                onClick={fetchQuote}
                className="text-slate-400 hover:text-white transition-colors"
                disabled={isQuoteLoading}
              >
                {isQuoteLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCwIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  value={outputAmount}
                  readOnly
                  className="bg-transparent border-none text-lg text-white focus-visible:ring-0 p-0 h-auto"
                />
              </div>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 border border-slate-700 rounded-sm">
                <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                <span className="text-white">{templateData.ticker || "TOKEN"}</span>
              </div>
            </div>
          </div>

          {/* Bouton de swap */}
          {connected ? (
            <Button
              onClick={handleSwap}
              disabled={isLoading || isQuoteLoading || !tokenAddress}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {isLoading ? "Swapping..." : "Swap"}
            </Button>
          ) : (
            <div className="text-center bg-slate-900 border border-slate-700 py-3 text-slate-300 rounded-sm">
              Connect your wallet to swap
            </div>
          )}

          {/* Message de statut */}
          {swapStatus === 'success' && (
            <div className="bg-green-900/30 border border-green-800 p-3 text-green-200 text-sm rounded-sm">
              Swap successful! Your tokens are on the way.
            </div>
          )}

          {swapStatus === 'error' && (
            <div className="bg-red-900/30 border border-red-800 p-3 text-red-200 text-sm rounded-sm">
              {errorMessage || "Swap failed. Please try again."}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 