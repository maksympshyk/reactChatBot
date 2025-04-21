import React from "react";
import "./Tree.css"; // Import the CSS file for styling

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
  isRoot?: boolean;
}

const Node: React.FC<TreeNodeProps> = ({ node, isRoot = false }) => {
  const isLeaf = !node.children || node.children.length === 0;

  return (
    <div className="node-container">
      <div
        className={`node ${isRoot ? "root-node" : ""} ${
          isLeaf ? "leaf-node" : ""
        }`}
      >
        {node.label}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="children-container">
          <div className="absolute w-[2px] h-full bg-gray-300"></div>
          {node.children.map((child, index) => {
            const isFirstChild = index === 0;
            const isLastChild = index === node.children!.length - 1;
            const verticalConnectionStyle = {
              top: isFirstChild ? "0" : isLastChild ? "50%" : "100%",
              height: "50%",
              width: "2px",
              color: "white",
              backgroundColor: "white"
            };

            return (
              <div key={child.id} className="child-wrapper">
                <div
                  className={
                    isFirstChild || isLastChild ? "absolute" : "hidden"
                  }
                  style={verticalConnectionStyle}
                />

                <Node node={child} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TreeDivisionDiagram: React.FC = () => {
  const treedata = {
    nodes: {
      id: "root",
      label: "12.8x",
      children: [
        {
          id: "node1",
          label: "5,000",
          children: [
            {
              id: "node1-1",
              label: "3,600",
              children: [
                { id: "node1-1-1", label: "1,200" },
                { id: "node1-1-2", label: "2,400" }
              ]
            },
            { id: "node1-2", label: "1,400" },
            { id: "node1-3", label: "1,534" }
          ]
        },
        {
          id: "node2",
          label: "392",
          children: [
            { id: "node2-1", label: "178" },
            { id: "node2-2", label: "123" },
            { id: "node2-1", label: "178" },
            { id: "node2-2", label: "123" }
          ]
        }
      ]
    }
  };

  return (
    <div className="tree-diagram">
      <div className="tree-animation w-full h-full z-10"></div>
      <Node node={treedata.nodes} isRoot={true} />
    </div>
  );
};

export default TreeDivisionDiagram;
