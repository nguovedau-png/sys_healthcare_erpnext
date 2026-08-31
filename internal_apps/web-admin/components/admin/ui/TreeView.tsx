"use client";
import React, { useState } from 'react';

export interface TreeNode {
    id: string;
    label: string;
    icon?: string;
    children?: TreeNode[];
    isExpanded?: boolean;
}

interface TreeViewProps {
    data: TreeNode[];
    selectedId?: string;
    onSelect?: (node: TreeNode) => void;
    className?: string;
}

const TreeNodeItem = ({ node, level, selectedId, onSelect, onToggle }: {
    node: TreeNode;
    level: number;
    selectedId?: string;
    onSelect?: (node: TreeNode) => void;
    onToggle: (id: string) => void;
}) => {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="select-none">
            <div
                className={`
                    flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-blue-50 text-primary font-bold shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                `}
                style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
                onClick={() => onSelect?.(node)}
            >
                {hasChildren && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(node.id);
                        }}
                        className="mr-2 p-1 rounded-md hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <i className={`fi flaticon-angle-${node.isExpanded ? 'down' : 'right'} text-xs`}></i>
                    </button>
                )}
                {!hasChildren && <span className="w-6" />} {/* Spacer for indentation alignment */}

                {node.icon && <i className={`fi flaticon-${node.icon} mr-2 ${isSelected ? 'text-primary' : 'text-gray-400'}`}></i>}
                <span className="text-sm truncate">{node.label}</span>

                {hasChildren && (
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {node.children?.length}
                    </span>
                )}
            </div>

            {hasChildren && node.isExpanded && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                    {node.children!.map((child) => (
                        <TreeNodeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const TreeView = ({ data, selectedId, onSelect, className = '' }: TreeViewProps) => {
    const [nodes, setNodes] = useState<TreeNode[]>(data);

    const toggleNode = (id: string) => {
        const toggleRecursive = (items: TreeNode[]): TreeNode[] => {
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, isExpanded: !item.isExpanded };
                }
                if (item.children) {
                    return { ...item, children: toggleRecursive(item.children) };
                }
                return item;
            });
        };
        setNodes(toggleRecursive(nodes));
    };

    return (
        <div className={`border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm ${className}`}>
            <div className="p-2">
                {nodes.map((node) => (
                    <TreeNodeItem
                        key={node.id}
                        node={node}
                        level={0}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        onToggle={toggleNode}
                    />
                ))}
            </div>
        </div>
    );
};
